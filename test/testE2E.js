const { Builder, By, until } = require('selenium-webdriver');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testAddAndUpdateUser() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        console.log('🟡 Ouverture de la page...');
        await driver.get('http://localhost:3000');
        await sleep(1000);

        console.log('📥 Remplissage du formulaire pour création...');
        await driver.findElement(By.name('username')).sendKeys('TestUser');
        await sleep(500);
        await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
        await sleep(500);

        // Scroll + mise en évidence + clic sur le bouton Ajouter
        const addBtn = await driver.findElement(By.id('addUserBtn'));
        await driver.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", addBtn);
        console.log('📍 Scroll vers le bouton Ajouter...');
        await sleep(1000);

        await driver.executeScript("arguments[0].style.border = '3px solid green';", addBtn);
        console.log('🎯 Bouton Ajouter mis en surbrillance');
        await sleep(1500);

        console.log('▶️ Clic sur le bouton Ajouter...');
        await addBtn.click();
        await sleep(1500);

        console.log('🔍 Vérification de l’ajout...');
        await driver.wait(until.elementLocated(By.css('#usersTable tbody tr')), 5000);
        await sleep(1000);

        const rows = await driver.findElements(By.css('#usersTable tbody tr'));
        if (rows.length === 0) throw new Error('Aucune ligne trouvée dans le tableau.');

        console.log('⚙️ Préparation à la modification...');
        await driver.executeScript(() => {
            window.prompt = (msg) => {
                if (msg.includes("nom")) return "UpdatedUser";
                if (msg.includes("email")) return "updated@example.com";
                return "";
            };
        });
        await sleep(500);

        const editBtn = await driver.findElement(By.css('#usersTable tbody tr:last-child button'));
        await driver.executeScript("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", editBtn);
        console.log('📍 Scroll vers le bouton Modifier...');
        await sleep(1000);

        await driver.executeScript("arguments[0].style.border = '3px solid red';", editBtn);
        console.log('🎯 Bouton Modifier mis en surbrillance');
        await sleep(1500);

        console.log('✏️ Clic sur le bouton Modifier...');
        await editBtn.click();
        await sleep(1500);

        console.log('✅ Vérification des nouvelles données...');
        const updatedName = await driver.findElement(By.css('#usersTable tbody tr:last-child td:nth-child(1)')).getText();
        const updatedEmail = await driver.findElement(By.css('#usersTable tbody tr:last-child td:nth-child(2)')).getText();

        if (updatedName === 'UpdatedUser' && updatedEmail === 'updated@example.com') {
            console.log('✅ Test réussi : utilisateur créé et modifié avec succès.');
        } else {
            console.log('❌ Test échoué : les données modifiées ne sont pas correctes.');
        }

    } catch (err) {
        console.error('❌ Erreur durant le test E2E :', err);
    } finally {
        console.log('🧹 Fermeture du navigateur...');
        await sleep(2000);
        await driver.quit();
    }
}

testAddAndUpdateUser();
