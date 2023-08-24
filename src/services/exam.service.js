const { Exam, Question, ExamQuestion } = require('@src/db');
const { Configuration, OpenAIApi } = require("openai");
const { Op, where, fn, col } = require('sequelize');

const exams_services_getList = async (params) => {
    const exams = await Exam.findAll(params);
    return exams;
}

const exams_services_create = async (params) => {
    try {
        const { exam_name, exam_total_questions, questions } = params;
        const exam = await Exam.create({ exam_name, exam_total_questions });
        if(questions) {
            const questions = questions.map(async (question) => {
                const question_create = await Question.create(question);
                await ExamQuestion.create({ exams_questions_exam_id: exam.exam_id, exams_questions_questions_id: question_create.question_id });
                return question_create;
            });
            const result = JSON.parse(JSON.stringify(exam));
            result["questions"] = questions;
            return result;
        } else {
            const { skill, language } = params;
            const configuration = new Configuration({
                apiKey: process.env.OPENAI_API_KEY,
            });
            const question = renderQuestion(skill,language, exam_total_questions);
            const openai = new OpenAIApi(configuration);
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    "role": "user",
                    "content": question
                  }
                ],
                temperature: 0.5,
                max_tokens: 3000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            let render = await renderReponse(response["data"]["choices"][0]["message"]["content"]);
            if(!Array.isArray(render)) {
                render = await renderReponse(response["data"]["choices"][0]["message"]["content"]);
            } 
            const questionsPromises = render.map( async (item) => {
                let question_create = await Question.create({
                    question_content: item.question,
                    question_data: {
                        config_type: item.type,
                        question_answer: item.answers,
                        question_correct: item.correct_answer
                    },
                });
                await ExamQuestion.create({ exams_questions_exam_id: exam.exam_id, exams_questions_questions_id: question_create.question_id });
                return question_create;
            });
            const questions = await Promise.all(questionsPromises);
            const result = JSON.parse(JSON.stringify(exam));
            result["questions"] = questions;
            return result;
        }
    } catch (error) {
        console.log(error)
    }
}

const renderQuestion = (skill, language, total_questions) => {
    const languages = Array.isArray(language) ? language.join(', ') : language;
    return `${total_questions} câu hỏi ${skill} ${languages} bao gồm câu hỏi trắc nghiệm có lựa chọn và câu hỏi tự luận (đáp án theo từng câu hỏi).
            Theo mô tiếp là: 
            thứ tự cậu hỏi. (kiểu câu hỏi như là trăc nghiệm hoặc tự luận): câu hỏi ?
            nếu là trắc nghiệm thì hiển thị các lựa chọn
            đáp án đúng`
}

const renderReponse = async (response) => {
    try {
        const questions = response.split(/\n\n+/);
        const questionObjects = questions.map(question => {
            const lines = question.split('\n');
            const type = lines[0].includes('Trắc nghiệm') || lines[0].includes('trắc nghiệm') ? 1 : 2;
            const questionText = lines[0].replace(/^\d+\.\s*/, '');
            const answers = lines.slice(1, lines.length - 1).map(line => line.replace(/^\s*[a-d]\)\s*/, ''));
            const correctAnswer = lines[lines.length - 1].split(':')[1].trim();
            let correctAnswerIndex = 0;
            if (type === 1) {
                const correctAnswerLetter = correctAnswer.split(')')[1].trim();
                correctAnswerIndex = answers.findIndex(answer => {
                    return answer.includes(correctAnswerLetter);
                });
            }
            
            return {
                question: questionText,
                type: type,
                answers: answers,
                correct_answer: type === 1 ? correctAnswerIndex : correctAnswer
            };
        });
        return questionObjects;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    exams_services_getList,
    exams_services_create
}
