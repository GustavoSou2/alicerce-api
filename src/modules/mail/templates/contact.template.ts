export const contact_client_template = `<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; font-family: 'Poppins';">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:100%; margin:20px; border:1px solid #ddd;">
            <tr>
              <td style="background-color:#546de5; padding:30px; text-align:center; color:#ffffff;">
                <h2 style="margin:0;">Recebemos sua mensagem!</h2>
              </td>
            </tr>
            <tr>
              <td style="padding:30px; color:#333333;">
                <p style="font-size:16px;">Olá,</p>
                <p style="font-size:16px;">Agradecemos por entrar em contato. Nossa equipe já recebeu sua mensagem e responderá o mais breve possível.</p>
                <p style="font-size:16px;">Enquanto isso, você pode explorar mais sobre nossos serviços em nosso site.</p>
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

export const contact_admin_template = (payload: any) =>
  `<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; font-family: 'Poppins';">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="max-width:100%; margin:20px auto; border:1px solid #ddd;">
            <tr>
              <td style="background-color:#546de5; padding:20px 30px; color:#ffffff;">
                <h2 style="margin:0; font-size:22px;">📩 Novo contato recebido</h2>
              </td>
            </tr>
            <tr>
              <td style="padding:30px; color:#333333;">
                <p style="font-size:16px; margin-top:0;">Um novo contato foi enviado através do formulário no site. Veja os detalhes abaixo:</p>
                <table cellpadding="0" cellspacing="0" width="100%" style="margin-top:20px; font-size:15px;">
                  <tr>
                    <td style="font-weight:bold; padding:8px 0; width:150px;">Nome:</td>
                    <td>${payload.name}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold; padding:8px 0;">E-mail:</td>
                    <td>${payload.email}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold; padding:8px 0;">Telefone:</td>
                    <td>${payload.phone}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold; padding:8px 0;">Mensagem:</td>
                    <td style="white-space:pre-line;">${payload.message}</td>
                  </tr>
                </table>
                <p style="margin-top:30px; font-size:14px; color:#888888;">Este e-mail foi enviado automaticamente pelo sistema. Favor não responder.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px; text-align:center; font-size:12px; color:#999999;">
                © 2025 Alicerce — Sistema de Contato Automático
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
