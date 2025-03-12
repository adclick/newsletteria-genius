import type { Newsletter } from '@/services/api';

export const generateEmailHtml = (newsletter: Newsletter): string => {
  return `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${newsletter.title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 30px; background-color: #1d4ed8; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">${newsletter.title}</h1>
            </td>
          </tr>
          
          <!-- Introduction -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0; font-size: 16px; line-height: 1.6;">${newsletter.introduction}</p>
            </td>
          </tr>

          <!-- Sections -->
          ${newsletter.sections.map((section, index) => `
          <tr>
            <td style="padding: 0 30px;">
              <table role="presentation" style="width: 100%; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h2 style="color: #1d4ed8; font-size: 22px; margin: 0 0 15px 0; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                      ${section.title}
                    </h2>
                    <div style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 20px;">
                      ${section.content.split('\n').map(paragraph =>
                        `<p style="margin: 0 0 15px 0;">${paragraph}</p>`
                      ).join('')}
                    </div>
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
                      <p style="margin: 0; font-size: 14px; color: #64748b; font-style: italic;">
                        <strong>Sugestão de imagem:</strong><br/>
                        ${section.imageDescription}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `).join('')}

          <!-- Call to Action -->
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" style="width: 100%; background-color: #dbeafe; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="color: #1d4ed8; font-size: 20px; margin: 0 0 15px 0;">Call to Action</h2>
                    <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #1e40af;">
                      ${newsletter.callToAction}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #f8fafc; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #64748b;">
                Newsletter gerada por Newsletteria Genius
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};
