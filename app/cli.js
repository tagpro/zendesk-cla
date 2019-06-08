// Map the commands to the logic/view
const program = require('commander');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const { getInputType } = require('./logic');
const { log, CONSTANTS } = require('./utils');
const { data } = require('./data');

class cli {
    constructor() {
        program
            .version('1.0.0')
            .description('This tool will help you find user tickets.');

        if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
            program.outputHelp();
            process.exit();
        }
        program.parse(process.argv)
        this.program = program;
        log.success('Setting up cli . . . complete');
    }
    static entitySelection() {
        let { USERS, TICKETS, ORGANISATIONS } = CONSTANTS.ENTITIES;
        return [USERS, TICKETS, ORGANISATIONS];
    }
    async getSearch() {
        // Set up all the queries here
        try {
            let choices = cli.entitySelection();
            let selection = await prompt([
                {
                    type: 'list',
                    name: 'entitySelection',
                    choices,
                    message: 'Select an entity to search'
                }
            ]);
            return selection.entitySelection;
        } catch (error) {
            log.error('Error while creating the selection prompt', error);
        }
    }

    createEntity(entityChoice) {
        let { USERS, TICKETS, ORGANISATIONS } = CONSTANTS.ENTITIES, Entity;
        try {
            let { Organisation, User, Ticket } = data.getEntities();
            switch (entityChoice) {
                case USERS: {
                    Entity = User;
                    break;
                }
                case TICKETS: {
                    Entity = Ticket;
                    break;
                }
                case ORGANISATIONS: {
                    Entity = Organisation;
                    break;
                }
            }
        } catch (error) {
            log.error('Error while fetching option fields', error);
        }
        log.message(chalk.yellow(Entity.toString()), 'this is the entity type')
        return Entity;
    }

    async getSearchCriteria(entityChoice) {
        let { USERS, TICKETS, ORGANISATIONS } = CONSTANTS.ENTITIES,
            Entity = this.createEntity(entityChoice), choices;
        choices = Entity.getFields();

        // Handling promise errors
        try {
            const choice = await prompt([
                {
                    type: 'list',
                    name: 'fieldChoice',
                    choices: choices,
                    message: 'Select a field to search',
                }
            ]);
            const choiceType = Entity.getFieldType(choice.fieldChoice);
            const InputOptions = {
                message: `Please enter the value for ${choice.fieldChoice}`,
                name: 'searchValue',
                ...choiceType
            }
            const value = await prompt([
                {
                    ...InputOptions
                }
            ]);
            log.simple(chalk.bgCyan(`The value entered is ${value.searchValue}`))
        } catch (error) {
            log.error('Some error occured while generating search options', error);
        }
    }
}

module.exports = {
    commandInterace: cli
}