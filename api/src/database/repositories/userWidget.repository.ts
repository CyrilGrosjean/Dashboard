import { DeleteResult, EntityRepository, InsertResult, Repository, UpdateResult } from "typeorm";
import { UserWidget } from "../entities/userWidget.entity";

@EntityRepository(UserWidget)
export class UserWidgetRepository extends Repository<UserWidget> {
    findAllByUserId(id: number): Promise<UserWidget[]> {
        return this.createQueryBuilder('user_widget')
            .where('user_widget.user_id = :id', { id })
            .getMany();
    }

    removeWidget(userId: number, widgetId: number): Promise<DeleteResult> {
        return this.createQueryBuilder('user_widget')
            .delete()
            .where('user_widget.user_id = :userId AND user_widget.widget_number = :widgetId', { userId, widgetId })
            .execute();
    }

    insertWidget(userId: number, serviceId: number, widgetId: number, widgetNumber: number): Promise<InsertResult> {
        return this.createQueryBuilder('user_widget')
            .insert()
            .into(UserWidget)
            .values({
                user_id: userId, service_id: serviceId, widget_id: widgetId, widget_number: widgetNumber, x_y: [0, 0]
            })
            .execute();
    }

    updateWidget(userId: number, widgetNumber: number, coords: number[], formValues: string): Promise<UpdateResult> {
        return this.createQueryBuilder('user_widget')
            .update()
            .set({ x_y: coords, form_values: formValues })
            .where('user_widget.user_id = :userId AND user_widget.widget_number = :widgetNumber', { userId, widgetNumber })
            .execute();
    }

    updateWidgetOnlyCoords(userId: number, widgetNumber: number, coords: number[]): Promise<UpdateResult> {
        return this.createQueryBuilder('user_widget')
        .update()
        .set({ x_y: coords })
        .where('user_widget.user_id = :userId AND user_widget.widget_number = :widgetNumber', { userId, widgetNumber })
        .execute();
    }

    updateWidgetOnlyForm(userId: number, widgetNumber: number, formValues: string): Promise<UpdateResult> {
        return this.createQueryBuilder('user_widget')
            .update()
            .set({ form_values: formValues })
            .where('user_widget.user_id = :userId AND user_widget.widget_number = :widgetNumber', { userId, widgetNumber })
            .execute();
    }
}