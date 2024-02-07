

import {Client} from '@notionhq/client';

const notionSecret = process.env.NOTION_SECRET;


const notion = new Client({ auth: notionSecret });




export default notion;
