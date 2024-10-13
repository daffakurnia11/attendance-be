import { Request, Response, NextFunction } from "express";
import AttendanceService from "../services/AttendanceService";
import { ATTENDANCE_MESSAGE } from "../utils/message";

class AttendanceController {
  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = req.query as Record<string, string>;

      if (filter) {
        const attendances = await AttendanceService.filterByKeys(filter);
        res.success(ATTENDANCE_MESSAGE.GET_ALL, attendances);
      } else {
        const attendances = await AttendanceService.findAll();
        res.success(ATTENDANCE_MESSAGE.GET_ALL, attendances);
      }
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const attendance = await AttendanceService.findById(id as string);
      res.success(ATTENDANCE_MESSAGE.GET_BY_ID, attendance);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = await req.user;
      const data = req.body;
      const attendance = await AttendanceService.create({
        user_id: id,
        ...data,
      });
      res.created(ATTENDANCE_MESSAGE.CREATED, attendance);
    } catch (error) {
      next(error);
    }
  }
}

export default new AttendanceController();
