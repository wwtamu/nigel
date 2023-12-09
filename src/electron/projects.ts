import { ipcMain } from 'electron';
import { Connection } from 'typeorm';
import { Project } from '../app/core/model/project.schema';

export const initProjects = (connection: Connection) => {

  const projectRepo = connection.getRepository(Project);

  ipcMain.on('get-projects', async (event: any, ...args: any[]) => {
    try {
      event.returnValue = await projectRepo.find();
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on('add-project', async (event: any, _project: Project) => {
    try {
      const project = await projectRepo.create(_project);
      await projectRepo.save(project);
      event.returnValue = await projectRepo.find();
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on('delete-project', async (event: any, _project: Project) => {
    try {
      const project = await projectRepo.create(_project);
      await projectRepo.remove(project);
      event.returnValue = await projectRepo.find();
    } catch (err) {
      throw err;
    }
  });

}
