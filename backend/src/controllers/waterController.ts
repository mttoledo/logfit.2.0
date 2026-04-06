import { Request, Response } from "express";
import logger from "../utils/logger.js";
import WaterLog from "../models/WaterLog.js";
import jwt from "jsonwebtoken";

export const addWaterLog = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantidade inválida. Insira um valor maior que zero",
      });
    }

    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Não autorizado." });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "chave_muito_secreta_1_2_1_2_2",
    ) as { id: string };

    const newLog = await WaterLog.create({
      amount,
      userId: decoded.id,
    });

    logger.info(
      `Log de água registrado: ${amount}ml para o usuário ${decoded.id}`,
    );

    return res.status(201).json({
      success: true,
      data: newLog,
    });
  } catch (e: any) {
    logger.error(`Erro ao salvar log de água: ${e.message}`);
    return res.status(500).json({
      success: false,
      message: "Erro interno no servidor ao tentar salvar os dados.",
    });
  }
};

export const getWaterLogs = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res
        .status(400)
        .json({ success: false, message: "Data obrigatória." });
    }

    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "chave...") as {
      id: string;
    };
    const userId = decoded.id;

    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    const logs = await WaterLog.find({
      userId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ createdAt: -1 });

    const totalMl = logs.reduce((acc, log) => acc + log.amount, 0);

    return res.status(200).json({
      success: true,
      totalMl,
      data: logs,
    });
  } catch (e: any) {
    logger.error(`Erro ao buscar logs de água: ${e.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao buscar histórico." });
  }
};

export const deleteWaterLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedLog = await WaterLog.findByIdAndDelete(id);

    if (!deletedLog) {
      return res
        .status(404)
        .json({ success: false, message: "Log não encontrado para exclusão" });
    }

    logger.info(`Log ${id} removido com sucesso.`);
    return res
      .status(200)
      .json({ success: true, message: "Registro deletado com sucesso" });
  } catch (e: any) {
    logger.error(`Erro no Delete: ${e.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao deletar log" });
  }
};

export const patchWaterLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantidade inválida. Insira um valor maior que zero",
      });
    }

    const updatedLog = await WaterLog.findByIdAndUpdate(
      id,
      { $set: { amount } },
      { new: true, runValidators: true },
    );

    if (!updatedLog) {
      return res.status(404).json({
        success: false,
        message: "Log não encontrado",
      });
    }

    logger.info(`Log ${id} atualizado para ${amount}ml`);
    return res.status(200).json({
      success: true,
      message: "Registro atualizado com sucesso",
      data: updatedLog,
    });
  } catch (e: any) {
    logger.error(`Erro no Update: ${e.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Erro ao atualizar log" });
  }
};
