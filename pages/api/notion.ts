

import {Client} from '@notionhq/client';
import type { NextApiResponse, NextApiRequest } from 'next';

const notionSecret = process.env.NOTION_SECRET;
const notionDBID = process.env.NOTION_DATABASE_ID;


const notion = new Client({ auth: notionSecret });
export {notion};
