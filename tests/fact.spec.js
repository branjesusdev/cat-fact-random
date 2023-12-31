import { test, expect } from '@playwright/test';

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
const LOCALHOST_URL = `http://localhost:5173/`
test('app show random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);


  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img', { name: 'Image extract using the first three words for' })

  const textContent = await text.textContent()
  const imgSrc = await image?.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect((imgSrc?.startsWith(CAT_PREFIX_IMAGE_URL) || imgSrc?.startsWith('/loading.gif'))).toBeTruthy()
});


test('app new random fact ', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const textOld = await page.getByRole('paragraph').textContent()

  await page.getByRole('button', { name: 'Get new fact' }).click()

  const textNew = await page.getByRole('paragraph').textContent()
  
  await expect(textOld).not.toBe(textNew)
});
