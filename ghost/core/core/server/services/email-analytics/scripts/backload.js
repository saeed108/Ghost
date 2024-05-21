const {aggregateEmailStats, aggregateMemberStats} = require('../lib/queries');
const db = require('../../../data/db');

(async function main() {
    const emailData = await db.knex.raw(`select id from emails where submitted_at > '2024-05-06 22:33:15'`);
    const emails = emailData[0];
    const memberData = await db.knex.raw(`select distinct(member_id) from email_recipients where processed_at > '2024-05-06 22:33:15'`);
    const members = memberData[0];

    console.log(`Processing ${emails.length} emails and ${members.length} members`);
    console.log(`Starting email processing...`);

    let emailCount = 0;
    emails.forEach(async ({id}) => {
        // await aggregateEmailStats(id);
        emailCount = emailCount + 1;
        if (emailCount % 100 === 0) {
            console.log(`Processed ${emailCount} emails`);
        }
    });
    console.log(`Finished email processing`);

    console.log(`Starting member processing...`);
    let memberCount = 0;
    members.forEach(async ({member_id}) => {
        // await aggregateMemberStats(member_id);
        memberCount = memberCount + 1;
        if (memberCount % 1000 === 0) {
            console.log(`Processed ${memberCount} members`);
        }
    });
    console.log(`Finished member processing`);
    console.log(`Finished processing`);
})();