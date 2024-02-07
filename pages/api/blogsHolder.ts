import { cache } from 'react'

import notion from "./notion";
import {Client} from '@notionhq/client';
import type { NextApiResponse, NextApiRequest } from 'next';

export const revalidate = 1;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(!process.env.NOTION_SECRET || !process.env.NOTION_DATABASE_ID){
        throw new Error('Notion secret or database id not provided');
    }

    
    const response = await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID,
        filter:{
            property: 'Published',
            checkbox: {
                equals: true
            }
        }
    });

    res.status(200).json({data: response?.results});


}

