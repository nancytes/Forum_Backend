const { StatusCodes } = require("http-status-codes");

const dbconnection = require("../db/dbconfig");

async function createQuestion(req, res) {
	const { userId, questionId, title, description, tag } = req.body;

	if (!tag || !title || !description) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Please enter all information" });
	}

	try {
		await dbconnection.query(
			"INSERT INTO questions(questionid,userid,title,description,tag) VALUES(?,?,?,?,?)",
			[questionId, userId, title, description, tag]
		);

		return res
			.status(StatusCodes.CREATED)
			.json({ msg: "question posted successfully" });
	} catch (error) {
		console.log("posted", error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong try again later" });
	}
}

async function updateQuestion(req, res) {
	const { questionid, title, description, tag } = req.body;

	if (!questionid || !title || !description || !tag) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Please provide all required information" });
	}

	try {
		const query =
			"UPDATE questions SET title=?, description=?, tag=? WHERE questionid=?";
		const result = await dbConnectionPromise.query(query, [
			title,
			description,
			tag,
			questionid,
		]);

		if (result) {
			return res
				.status(StatusCodes.OK)
				.json({ msg: "Question updated successfully" });
		} else {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: "Question not found" });
		}
	} catch (error) {
		console.error("Error updating question:", error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong" });
	}
}

async function deleteQuestion(req, res) {
	const { questionid } = req.body;

	if (!questionid) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Please provide question ID" });
	}

	try {
		const query = "DELETE FROM questions WHERE questionid=?";
		const result = await dbConnectionPromise.query(query, [questionid]);

		if (result) {
			return res
				.status(StatusCodes.OK)
				.json({ msg: "Question deleted successfully" });
		} else {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: "Question not found" });
		}
	} catch (error) {
		console.error("Error deleting question:", error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong" });
	}
}

async function allQuestions(req, res) {
	try {
		const query = `
            SELECT q.questionid, q.title, q.description, q.id, u.username
            FROM questions q
            JOIN users u ON q.userid = u.userid
            ORDER BY q.id DESC;
    `; //u and q are aliases.
		const result = await dbconnection.query(query);

		return res.status(StatusCodes.OK).json({ data: result[0] });
	} catch (error) {
		console.error("Error fetching question details with usernames:", error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong, try again later" });
	}
}
async function getQuestionDetail(req, res) {
	const questionId = req.params.questionId;

	try {
		const query =
			"SELECT q.*,u.username FROM questions q INNER JOIN users u ON q.userid=u.userid WHERE questionid = ?";
		const result = await dbConnectionPromise.query(query, [questionId]);

		if (result.length > 0) {
			return res.status(StatusCodes.OK).json(result[0]);
		} else {
			return res
				.status(StatusCodes.NOT_FOUND)
				.json({ msg: "Question not found" });
		}
	} catch (error) {
		console.error("Error fetching question detail:", error);
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong" });
	}
}

module.exports = {
	createQuestion,
	deleteQuestion,
	updateQuestion,
	allQuestions,
	getQuestionDetail,
};
