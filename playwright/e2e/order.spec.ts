import { test, expect } from '@playwright/test'
///AAA - Arrange, Act, Assert

test('the order lookup page is loaded and the order is found', async ({ page }) => {
    //Arrange
    const orderId = 'VLO-NJJ3IX';

    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    //Act
    //   await page.getByTestId('search-order-id').fill('VLO-NJJ3IX') //data-testid
    //   await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-NJJ3IX'); //XPATH
    //   await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-NJJ3IX'); //role and name CSS
    await page.getByLabel('Número do Pedido').fill(orderId); //label and name CSS

    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //Assert

    const orderIdText = page.getByText(orderId, { exact: true });
    await expect(orderIdText).toBeVisible({ timeout: 10_000 });


    //simples
    // await expect(orderIdText.locator('..').locator('..').locator('..')).toContainText('APROVADO');

    //elaborada
    const orderCard = page
        .locator('div.rounded-lg.border.bg-card')
        .filter({ hasText: orderId });

    await expect(orderCard).toContainText('APROVADO');


})