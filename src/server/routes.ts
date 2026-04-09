import { Router, Request, Response } from 'express';
import { marked } from 'marked';

import { ENGLISH_COMMANDS, SPANISH_COMMANDS } from './commands/index.js';

const router = Router();

// Main page
router.get('/', (_req: Request, res: Response) => {
  res.sendFile('index.html', { root: 'dist/public' });
});

// Get commands for a specific language
router.get('/commands/:language', (req: Request, res: Response) => {
  const { language } = req.params;

  if (language === 'es') {
    res.json(SPANISH_COMMANDS);
  } else if (language === 'en') {
    res.json(ENGLISH_COMMANDS);
  } else {
    res.status(400).json({ error: 'Unsupported language' });
  }
});

// Preview markdown as HTML
router.post('/preview', async (req: Request, res: Response) => {
  const markdownText: string = req.body.markdown ?? '';
  const htmlContent = await marked.parse(markdownText, {
    gfm: true,
    breaks: true,
  });
  res.json({ html: htmlContent });
});

// Save/download markdown file
router.post('/save', (req: Request, res: Response) => {
  const markdownText: string = req.body.markdown ?? '';
  let filename: string = req.body.filename ?? 'document.md';

  if (!filename.endsWith('.md')) {
    filename += '.md';
  }

  // Sanitize filename: keep only safe characters to prevent header injection
  filename = filename.replace(/[^\w \-.]/g, '').trim();
  if (!filename || filename === '.md') {
    filename = 'document.md';
  }

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.send(markdownText);
});

export default router;
