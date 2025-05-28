import { Builder, By, until } from 'selenium-webdriver';
import { createJiraIssue } from './jira.js';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testAddUser() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log('🟡 Démarrage du test d’ajout d’utilisateur...');
        await driver.get('http://localhost:3000');
        await sleep(1000);

        console.log('📥 Remplissage du formulaire...');
        await driver.findElement(By.name('username')).sendKeys('Alice');
        await sleep(1000);
        await driver.findElement(By.name('email')).sendKeys('alice@example.com');
        await sleep(1000);

        console.log('🖱️ Clic sur le bouton "Ajouter"...');
        await driver.findElement(By.id('addUserBtn')).click();
        await sleep(1000);

        console.log('🔄 Attente de la mise à jour du tableau...');
        await driver.wait(async () => {
            const rows = await driver.findElements(By.css('#usersTable tbody tr'));
            return rows.length > 0;
        }, 5000);
        await sleep(1000);

        console.log('🔍 Vérification de l’ajout de l’utilisateur...');
        const rows = await driver.findElements(By.css('#usersTable tbody tr'));
        let found = false;

        for (const row of rows) {
            const text = await row.getText();
            if (text.includes('Alicer') && text.includes('alicef@example.com')) {
                found = true;
                break;
            }
        }

        if (found) {
            console.log('✅ Test réussi : utilisateur "Alice" ajouté avec succès.');
        } else {
            console.log('❌ Test échoué : utilisateur non trouvé dans le tableau.');

            await createJiraIssue(
              'Test Add User échoué',
              'L’utilisateur "Alice" n’a pas été trouvé dans le tableau après ajout.'
            );
        }

    } catch (err) {
        console.error('❌ Erreur durant le test E2E :', err);

        await createJiraIssue(
          'Erreur lors du test Add User',
          `Le test a échoué avec l’erreur suivante :\n${err.stack}`
        );

    } finally {
        console.log('🧹 Fermeture du navigateur...');
        await sleep(2000);
        await driver.quit();
    }
}

testAddUser();
