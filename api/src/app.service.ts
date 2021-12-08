import { Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { UserWidget } from './database/entities/userWidget.entity';
import { UserWidgetRepository } from './database/repositories/userWidget.repository';

@Injectable()
export class AppService {

    private connection;

    constructor() {
        this.getConnection();
    }

    private async getConnection() {
        this.connection = await createConnection({
            type: 'postgres',
            url: 'postgres://user:password@postgres:5432/postgres',
            entities: [UserWidget],
        });
    }

    public getAbout(ip: any): Object {
        return {
            client: {
                host: ip
            },
            server: {
                current_time: Date.now(),
                services: [{
                    name: 'weather',
                    widgets: [{
                        name: 'city weather',
                        description: 'Display informations for the current weather of the city',
                        params: [{
                            name: 'city',
                            type: 'string',
                        }]
                    }, {
                        name: 'location pollution',
                        description: 'Display the air pollution from GPS coordinates between two dates',
                        params: [{
                            name: 'city',
                            type: 'string',
                        }, {
                            name: 'start',
                            type: 'number',
                        }, {
                            name: 'end',
                            type: 'number',
                        }]
                    }]
                }, {
                    name: 'riot',
                    widgets: [{
                        name: 'rotations',
                        description: 'Get the current rotation from League Of Legends',
                        params: [{
                            name: 'rotation_type',
                            type: 'number',
                        }]
                    }, {
                        name: 'last match',
                        description: 'Get the last League Of Legends match from a player',
                        params: [{
                            name: 'name',
                            type: 'string'
                        }]
                    }]
                }, {
                    name: 'reddit',
                    widgets: [{
                        name: 'profile',
                        description: 'Get the user profile',
                    }]
                }, {
                    name: 'youtube',
                    widgets: [{
                        name: 'youtube stats',
                        description: 'Get the youtube channel statistics',
                        params: [{
                            name: 'name',
                            type: 'string',
                        }]
                    }, {
                        name: 'youtube last video',
                        description: 'Get the last video from the youtube channel',
                        params: [{
                            name: 'name',
                            type: 'string',
                        }]
                    }]
                }, {
                    name: 'currency',
                    widgets: [{
                        name: 'conversion',
                        description: 'Return currency rate',
                        params: [{
                            name: 'actual_currency',
                            type: 'string',
                        }, {
                            name: 'convert_currency',
                            type: 'string',
                        }]
                    }, {
                        name: 'crypto conversion',
                        description: 'Return crypto currency rate',
                        params: [{
                            name: 'actual_currency',
                            type: 'string'
                        }, {
                            name: 'convert_currency',
                            type: 'string',
                        }]
                    }]
                }, {
                    name: 'spotify',
                    widgets: [{
                        name: 'track',
                        description: 'Get and play the searched track',
                        params: [{
                            name: 'name',
                            type: 'string',
                        }]
                    }, {
                        name: 'artist',
                        description: 'Get stats of the searched artist',
                        params: [{
                            name: 'name',
                            type: 'string',
                        }]
                    }]
                }]
            }
        };
    }

    public addWidget(userId: number, serviceId: number, widgetId: number, widgetNumber: number): boolean {
        const widgetRepository = this.connection.getCustomRepository(UserWidgetRepository);
        return widgetRepository.insertWidget(userId, serviceId, widgetId, widgetNumber).then((value) => {
            if (value) {
                return true;
            }
            return false;
        });
    }

    public removeWidget(userId: number, widgetNumber: number): boolean {
        const widgetRepository = this.connection.getCustomRepository(UserWidgetRepository);
        return widgetRepository.removeWidget(userId, widgetNumber).then((value) => {
            if (value) {
                return true;
            }
            return false;
        });
    }

    public updateWidget(json: any): boolean {
        const widgetRepository = this.connection.getCustomRepository(UserWidgetRepository);
        const userId: number = json.userId;
        const widgetNumber: number = json.id;
        let coords: number[] = [];
        let formValues = {};

        if (json.coords) {
            coords = json.coords;
        }
        if (json.formValues) {
            formValues = json.formValues;
        }
        if (coords.length != 0 && Object.keys(formValues).length != 0) {
            return widgetRepository.updateWidget(userId, widgetNumber, coords, JSON.stringify(formValues)).then((value) => {
                if (value) {
                    return true;
                }
                return false;
            })
        } else if (coords.length != 0) {
            return widgetRepository.updateWidgetOnlyCoords(userId, widgetNumber, coords).then((value) => {
                if (value) {
                    return true;
                }
                return false;
            });
        } else if (Object.keys(formValues).length != 0) {
            return widgetRepository.updateWidgetOnlyForm(userId, widgetNumber, JSON.stringify(formValues)).then((value) => {
                if (value) {
                    return true;
                }
                return false;
            });
        }
        return false;
    }

    public getWidgets(userId: number): Object {
        const widgetRepository = this.connection.getCustomRepository(UserWidgetRepository);
        return widgetRepository.findAllByUserId(userId).then((value) => {
            if (value) {
                return value;
            }
            return null;
        });
    }

}
