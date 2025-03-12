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
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f3f4f6;">
  <!-- Preheader text (hidden) -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    ${newsletter.introduction.slice(0, 100)}...
  </div>
  
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
    <tr>
      <td style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);">
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 40px 50px 40px; text-align: center;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td>
                    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.025em; line-height: 1.2;">${newsletter.title}</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Content Container -->
          <tr>
            <td style="padding: 0;">
              <!-- White background container that overlaps the header -->
              <table role="presentation" style="width: 100%; background: #ffffff; border-radius: 16px; margin-top: -20px;">
                <tr>
                  <td style="padding: 40px;">
                    <!-- Introduction -->
                    <p style="margin: 0 0 30px 0; font-size: 18px; line-height: 1.6; color: #4b5563;">${newsletter.introduction}</p>

                    <!-- Sections -->
                    ${newsletter.sections.map((section, index) => `
                    <table role="presentation" style="width: 100%; margin-bottom: 40px; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
                      <tr>
                        <td style="padding: 30px;">
                          <!-- Section Title with accent bar -->
                          <table role="presentation" style="width: 100%; margin-bottom: 20px;">
                            <tr>
                              <td style="padding-left: 15px; border-left: 4px solid #3b82f6;">
                                <h2 style="color: #1e40af; font-size: 24px; margin: 0; font-weight: 600;">${section.title}</h2>
                              </td>
                            </tr>
                          </table>

                          <!-- Section Content -->
                          <div style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 25px;">
                            ${section.content.split('\n').map(paragraph =>
                              `<p style="margin: 0 0 15px 0;">${paragraph}</p>`
                            ).join('')}
                          </div>

                          <!-- Image Suggestion Box -->
                          <table role="presentation" style="width: 100%; background-color: #f8fafc; border-radius: 8px; margin-top: 20px;">
                            <tr>
                              <td style="padding: 20px;">
                                <table role="presentation" style="width: 100%;">
                                  <tr>
                                    <td style="width: 24px; vertical-align: top;">
                                      <div style="width: 24px; height: 24px; background-color: #3b82f6; border-radius: 50%; margin-right: 12px;"></div>
                                    </td>
                                    <td>
                                      <p style="margin: 0; font-size: 14px; color: #64748b;">
                                        <strong style="color: #1e40af; display: block; margin-bottom: 4px;">Sugestão de imagem</strong>
                                        <span style="font-style: italic;">${section.imageDescription}</span>
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    `).join('')}

                    <!-- Call to Action -->
                    <table role="presentation" style="width: 100%; margin-top: 30px; margin-bottom: 40px;">
                      <tr>
                        <td>
                          <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); border-radius: 12px; overflow: hidden;">
                            <tr>
                              <td style="padding: 30px; text-align: center;">
                                <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">Call to Action</h2>
                                <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #ffffff;">
                                  ${newsletter.callToAction}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Footer -->
                    <table role="presentation" style="width: 100%; margin-top: 20px;">
                      <tr>
                        <td style="padding: 30px 0; text-align: center; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 0; font-size: 14px; color: #6b7280;">
                            Newsletter gerada por <span style="color: #1e40af; font-weight: 600;">Newsletteria</span>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
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
