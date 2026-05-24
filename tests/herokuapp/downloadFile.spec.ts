import {test,expect} from '../../fixtures/fixture';

test.describe('Handle downloadFiles', () => {

    test.beforeEach(async ({ herokuAppPage }) => {  
        await herokuAppPage.navigateTo();
        await herokuAppPage.navigateToFileDownload(); // Navigate to the Download page
    });

    test('should download a file', async ({ page, herokuAppPage }) => {
     const download = await herokuAppPage.downloadFile('some-file.txt');

  const path = await download.path();
  expect(path).toBeTruthy(); // Verify that the download path is valid
    });

});
