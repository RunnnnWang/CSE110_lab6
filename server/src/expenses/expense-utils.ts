import { Expense } from "../types";
import { Request, Response } from "express";
import { Database } from "sqlite";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    const { id, cost, description } = req.body;
 
    if (!description || !id || !cost) {
        return res.status(400).send({ error: "Missing required fields" });
    }
 
    try {
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
    res.status(201).send({ id, description, cost });
 
 
 }
 

export async function deleteExpense(req: Request, res: Response, expenses: Database) {
    // TO DO: Implement deleteExpense function
    const { id } = req.params;

    const wether_delete = await expenses.run("DELETE FROM expenses WHERE id = ?", id);

    if (wether_delete.changes === 0) {
        return res.status(404).send({ error: "Expense not found" });
    }

    res.status(201).send(id);

}

export async function getExpenses(req: Request, res: Response, db: Database) {
    const expenses = await db.all("SELECT * FROM expenses");
    res.status(200).send({ "data": expenses });
}