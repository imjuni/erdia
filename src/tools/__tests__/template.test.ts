import * as mnf from 'my-node-fp';
import getTemplatePath from 'src/tools/files/getTemplatePath';

jest.mock('my-node-fp');

const basePathForGetTemplatePath = '/path01/path02/path03';

describe('getTemplatePath', () => {
  test(`__dirname is 'src/tools/files/getTemplatePath'`, async () => {
    const expectation = '/path01/templates';
    const getDirnameSpyOn = jest.spyOn(mnf, 'getDirname').mockImplementation(async (dirname: string) => dirname);
    const existsSpyOn = jest.spyOn(mnf, 'exists').mockImplementation(async (existPath: string) => {
      switch (existPath) {
        case basePathForGetTemplatePath:
        case expectation:
          return true;
        default:
          return false;
      }
    });

    const version = await getTemplatePath('/path01/path02/path03/path04');

    getDirnameSpyOn.mockRestore();
    existsSpyOn.mockRestore();

    expect(version).toEqual(expectation);
  });

  test(`__dirname is 'src/templates/html'`, async () => {
    const expectation = '/path01/path02/templates';
    const getDirnameSpyOn = jest.spyOn(mnf, 'getDirname').mockImplementation(async (dirname: string) => dirname);
    const existsSpyOn = jest.spyOn(mnf, 'exists').mockImplementation(async (existPath: string) => {
      switch (existPath) {
        case basePathForGetTemplatePath:
        case expectation:
          return true;
        default:
          return false;
      }
    });

    console.log('INIT_CWD: ', process.env.INIT_CWD);
    console.log('process.cwd(): ', process.cwd());

    const version = await getTemplatePath('/path01/path02/path03/path04');

    getDirnameSpyOn.mockRestore();
    existsSpyOn.mockRestore();

    expect(version).toEqual(expectation);
  });

  test(`__dirname is 'templates'`, async () => {
    const expectation = '/path01/path02/path03/path04/templates';
    const getDirnameSpyOn = jest.spyOn(mnf, 'getDirname').mockImplementation(async (dirname: string) => dirname);
    const existsSpyOn = jest.spyOn(mnf, 'exists').mockImplementation(async (existPath: string) => {
      switch (existPath) {
        case basePathForGetTemplatePath:
        case expectation:
          return true;
        default:
          return false;
      }
    });

    const version = await getTemplatePath('/path01/path02/path03/path04');

    getDirnameSpyOn.mockRestore();
    existsSpyOn.mockRestore();

    expect(version).toEqual(expectation);
  });

  test('not found, every where', async () => {
    const getDirnameSpyOn = jest.spyOn(mnf, 'getDirname').mockImplementation(async (dirname: string) => dirname);
    const existsSpyOn = jest.spyOn(mnf, 'exists').mockImplementation(async (existPath: string) => {
      switch (existPath) {
        case basePathForGetTemplatePath:
          return true;
        default:
          return false;
      }
    });

    await expect(async () => {
      try {
        const templatePath = await getTemplatePath('/path01/path02/path03/path04');
        console.log(templatePath);
      } catch (err) {
        getDirnameSpyOn.mockRestore();
        existsSpyOn.mockRestore();

        throw err;
      }
    }).rejects.toThrowError();
  });

  test('not exists, base directory', async () => {
    await expect(async () => {
      await getTemplatePath('/path01/path02/path03/path04');
    }).rejects.toThrowError();
  });
});
