const { Builder, By, until } = require('selenium-webdriver');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testUpdateUser() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log('🟡 Lancement du test de mise à jour utilisateur...');
        await driver.get('http://localhost:3000');

        console.log('🕒 Attente du tableau des utilisateurs...');
        await driver.wait(until.elementLocated(By.css('#usersTable tbody tr')), 10000);
        await sleep(1000);

        console.log('✅ Tableau chargé. Injection des valeurs dans prompt()...');
        await driver.executeScript(() => {
            window.prompt = (msg) => {
                if (msg.includes("email")) return "modifie@gmail.com";
                return "mgodefroy";
            };
        });
        await sleep(1000);

        console.log('🖱️ Recherche et clic sur le bouton "Éditer"...');
        const editBtn = await driver.findElement(By.css('#usersTable tbody tr:first-child button'));
        await editBtn.click();
        await sleep(2000);

        console.log('🔍 Récupération des valeurs modifiées...');
        const updatedName = await driver.findElement(By.css('#usersTable tbody tr:first-child td:nth-child(1)')).getText();
        const updatedEmail = await driver.findElement(By.css('#usersTable tbody tr:first-child td:nth-child(2)')).getText();
        await sleep(1000);

        if (updatedName === 'mgodefroy' && updatedEmail === 'modifie@gmail.com') {
            console.log('✅ Test réussi : utilisateur modifié avec succès.');
        } else {
            console.log('❌ Test échoué : utilisateur non modifié.');
            console.log(`➡️ Nom actuel : ${updatedName}, Email actuel : ${updatedEmail}`);
        }

    } catch (err) {
        console.error('❌ Erreur durant le test E2E :', err);
    } finally {
        console.log('🧹 Fermeture du navigateur...');
        await sleep(2000);
        await driver.quit();
    }
}

testUpdateUser();
