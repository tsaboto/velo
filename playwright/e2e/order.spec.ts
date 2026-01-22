import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/')

  //checkpoint 1: the webapp is online and the title is correct
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()

  //checkpoint 2: the order lookup page is loaded
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  await page.getByTestId('search-order-id').fill('VLO-NJJ3IX')
  
  await page.getByTestId('search-order-button').click()
  await expect(page.getByTestId('order-result-id')).toBeVisible()
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-NJJ3IX')

  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
    

})