import {notion} from "./notion";
import {Client} from '@notionhq/client';
import type { NextApiResponse, NextApiRequest } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(!process.env.NOTION_SECRET || !process.env.NOTION_DATABASE_ID){
        throw new Error('Notion secret or database id not provided');
    }

    const query = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
    });
    // const pageId = 'af28c87d-f9a0-4fb9-8e2a-2d6a7d6c2603';
    const pageId = '29186868ce914be396d0f5b249818954';



    const {results: blocks} = await notion.blocks.children.list({ 
        block_id: pageId,
        page_size: 50,
    });

    res.status(200).json({data: blocks});


}