const mailer = require('nodemailer');

const sendMain = async (to, subject, name) => {
    const transport = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "jay.shree210410@gmail.com",
            pass: "rnkv qefw pfhi ezgg"
        }
    });

    const mailOption = {
        from: "jay.shree210410@gmail.com",
        to: to,
        subject: subject,
        html: `
             <div style="font-family: 'Segoe UI', sans-serif; background-color: #f5f7fa; padding: 30px;">
                <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                    <div style="background-color: #1e293b; color: #ffffff; padding: 30px;">
                        <h1 style="margin: 0;">Welcome to the Team, ${name}!</h1>
                        <p style="margin-top: 10px; font-size: 16px;">We're excited to have you at <strong>Your IT Company</strong></p>
                    </div>
                    <div style="padding: 30px; color: #444;">
                        <p style="font-size: 16px;">
                            You’re officially part of a dynamic and innovative team that's building world-class IT solutions.
                        </p>
                        <p style="font-size: 16px;">
                            At <strong>Your IT Company</strong>, we believe in collaboration, continuous learning, and delivering top-notch technology to our clients.
                        </p>
                        <p style="font-size: 16px;">
                            Our onboarding team will soon reach out with resources and steps to get you started. If you have any questions, feel free to reach out.
                        </p>
                        <p style="font-size: 16px;">
                            We're glad you're here and look forward to achieving great things together!
                        </p>
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
                        <p style="font-size: 14px; color: #888;">
                            Regards,<br />
                            <strong>The Your IT Company Team</strong><br />
                            contact@youritcompany.com
                        </p>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #888;">
                        © ${new Date().getFullYear()} Your IT Company. All rights reserved.
                    </div>
                </div>
            </div>
        `
    }

    const mailResponse = await transport.sendMail(mailOption)
    console.log(mailResponse.messageId);
}

module.exports = sendMain