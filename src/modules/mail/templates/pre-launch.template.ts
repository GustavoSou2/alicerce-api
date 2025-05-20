export const pre_launch_template = ` <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; font-family: 'Poppins';">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:100%; margin:20px; border:1px solid #ddd;">
            <tr>
              <td style="background-color:#546de5; padding:30px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:28px;">Estamos quase prontos!</h1>
                <p style="margin:10px 0 0; font-size:16px;">Fique ligado no nosso lançamento!</p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px; color:#333333; text-align:center;">
                <p style="font-size:16px; margin-bottom:20px;">Você está oficialmente na nossa lista de pré-lançamento. Em breve, novidades exclusivas diretamente no seu e-mail.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px; text-align:center; font-size:12px; color:#999999;">
                © 2025 Alicerce. Todos os direitos reservados.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;

export const pre_launch_admin_template = (
  payload: any,
) => ` <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; font-family: 'Poppins';">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:100%; margin:20px auto; border:1px solid #ddd;">
            <tr>
              <td style="background-color:#546de5; padding:20px 30px; color:#ffffff;">
                <h2 style="margin:0; font-size:22px;">🎉 Novo cadastro na lista de pré-lançamento</h2>
              </td>
            </tr>
            <tr>
              <td style="padding:30px; color:#333333;">
                <p style="font-size:16px; margin-top:0;">Um novo usuário se cadastrou para receber atualizações sobre o lançamento. Veja os dados:</p>
                <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:20px; font-size:15px;">
                  <tr>
                    <td style="font-weight:bold; padding:8px 0; width:150px;">Nome:</td>
                    <td>${payload.name}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold; padding:8px 0;">E-mail:</td>
                    <td>${payload.email}</td>
                  </tr>
                </table>
                <p style="margin-top:30px; font-size:14px; color:#888888;">Este e-mail foi enviado automaticamente pelo sistema. Nenhuma ação é necessária a menos que indicado.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px; text-align:center; font-size:12px; color:#999999;">
                © 2025 Alirce — Notificação de Pré-lançamento
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
