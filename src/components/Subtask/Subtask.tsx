import React from 'react'
import cls from "./Subtask.module.scss"

export default function Subtask() {
  return (



    <div className={cls.container}>
     
     
        
        
        </div>
  )
}


/* пишу сервер на express js использую typescript помоги создать api который  изменит статус всех Task (у которых parentId != null ) на  done или undone, проще говоря все модели Task у которых
parentId не равно null являются  сабтаскими. функция будет называться  updateStatus я попытался его создать но было неудачно.
это моя модель prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:GN74JZEL22UucfG1p1x3@containers-us-west-174.railway.app:6548/railway"
}

model Board {
  id        Int      @id @default(autoincrement())
  name      String
  columns   Column[]
  createdAt DateTime @default(now())
}

enum Columns {
  QUEUE
  DEVELOPMENT
  DONE
}

model Column {
  id        Int      @id @default(autoincrement())
  name      String
  boardId   Int
  board     Board    @relation(fields: [boardId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  task      Task[]
}

enum Status {
  QUEUE
  DEVELOPMENT
  DONE
}

model Task {
  id          Int       @id @default(autoincrement())
  name        String
  description String?
  priority    Priority  @default(LOW)
  columnId    Int?
  column      Column?   @relation(fields: [columnId], references: [id], onDelete: Cascade)
  files       File[]
  comments    Comment[]
  createdAt   DateTime  @default(now())

  status Status @default(QUEUE)

  position Int @default(autoincrement()) // Position in column

  subTasks Task[] @relation("TaskSubtask")
  parent   Task?  @relation("TaskSubtask", fields: [parentId], references: [id], onDelete: Cascade)
  parentId Int?
}

enum Priority {
  LOW
  HIGH
}

//Temp
model File {
  id        Int      @id @default(autoincrement())
  name      String
  taskId    Int
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade, onUpdate: NoAction)
  createdAt DateTime @default(now())
}

model Comment {
  id      Int    @id @default(autoincrement())
  content String
  taskId  Int
  task    Task   @relation(fields: [taskId], references: [id], onDelete: Cascade)

  comments Comment[] @relation("CommentComment")
  comment  Comment?  @relation("CommentComment", fields: [parentId], references: [id], onDelete: Cascade, onUpdate: NoAction)
  parentId Int?

  createdAt DateTime @default(now())
}



это мои функции для управления тасками :
import { Request, Response } from 'express';
import { prisma } from '../db';
import { Prisma } from '@prisma/client';

enum Columns {
  QUEUE = 'Queue',
  DEVELOPMENT = 'Development',
  DONE = 'Done',
}

const allowToUpate = ['name', 'description', 'priority', 'columnId'];

type PostCreateBody = Prisma.Args<typeof prisma.task, 'create'>['data'];

export const getTasks = async (req: Request, res: Response) => {
  const allTasks = await prisma.task.findMany();
  res.status(200).json({ data: allTasks });
};

export const createTask = async (req: Request, res: Response) => {
  const { name, columnId } = (req.body as PostCreateBody) ?? {};

  if (!name || !columnId)
    return res.status(404).json({ message: 'Missing some fields' });

  try {
    const column = await prisma.column.findUnique({
      where: {
        id: columnId,
        name: Columns.QUEUE,
      },
    });

    console.log({ column });

    if (!column)
      return res
        .status(404)
        .json({ message: 'You can create task only in QUEUE' });

    const newTask = await prisma.task.create({
      data: {
        name: name,
        columnId: columnId,
      },
    });
    console.log(newTask);

    res.status(201).json({ data: newTask });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const createSubTask = async (req: Request, res: Response) => {
  const { name } = (req.body as PostCreateBody) ?? {};

  const { parentId } = req.params;
  console.log(parentId);

  if (!name || !parentId || isNaN(+parentId))
    return res.status(404).json({ message: 'Missing some fields' });

  try {
    const taskParent = await prisma.task.findUnique({
      where: {
        id: +parentId,
        parentId: null,
      },
    });

    if (!taskParent)
      return res.status(400).json({ message: 'Error creating subtask' });

    const subTask = await prisma.task.create({
      data: {
        name,
        parentId: +parentId,
      },
      include: {
        subTasks: true,
      },
    });

    res.status(201).json({
      data: {
        subTask: subTask,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const body = req.body;
  const param = req.params as { id: string };

  const newBody = allowToUpate.reduce<any>((obj, current) => {
    if (body[current]) {
      return { ...obj, [current]: body[current] };
    } else {
      return obj;
    }
  }, {});

  if (!param || !newBody)
    return res.status(400).json({ message: 'Wrong input' });

  if (isNaN(Number(param.id))) return res.status(400);

  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: +param.id,
      },
      data: newBody,
    });

    res.status(201).json({ data: updatedTask });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

type ReorderedItems = {
  id: number;
  position: number;
};

type MoveColumn = {
  oldColumnId: number;
  newColumnId: number;
  tasks: ReorderedItems[];
};

async function reorder(tasks: ReorderedItems[], columndId: number) {
  const updates = tasks.map((task) =>
    prisma.task.update({
      where: { id: task.id },
      data: {
        position: task.position,
        columnId: columndId,
      },
    })
  );

  await Promise.all(updates);
}

async function reorderOldColumn(oldColumnId: number) {
  const column = await prisma.column.findUnique({
    where: { id: oldColumnId },
    include: {
      task: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!column) return;

  for (let i = 0; i < column.task.length; i++) {
    const taskId = column.task[i].id;

    await prisma.task.update({
      where: { id: taskId },
      data: { position: i + 1 },
    });
  }
}

export const moveColumn = async (req: Request, res: Response) => {
  const { oldColumnId, newColumnId, tasks } = (req.body as MoveColumn) ?? {};

  if (!newColumnId || !oldColumnId) {
    return res.status(400).json({ message: 'Please provide all columns ids' });
  }

  if (newColumnId === oldColumnId) {
    await reorder(tasks, newColumnId);
  } else {
    await reorder(tasks, newColumnId);
    await reorderOldColumn(oldColumnId);
  }

  res.status(200).json({ message: 'Update position of all tasks' });

  try {
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const removeTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (isNaN(+id))
    return res.status(404).json({ message: 'Missing some fields' });

  try {
    const task = await prisma.task.deleteMany({
      where: {
        id: parseInt(id),
      },
    });

    res.status(204).json({ data: task });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params; // task id
  const body = (req.body as { columnId: number }) ?? {}; // column id

  if (isNaN(+id))
    return res.status(404).json({ message: 'Missing some fields' });

  try {
    const aggregate = await prisma.task.aggregate({
      where: {
        column: {
          id: body.columnId,
        },
      },
      _max: {
        position: true,
      },
    });

    const max = aggregate._max.position;

    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        columnId: body.columnId,
        position: typeof max !== 'number' ? 1 : max + 1,
      },
    });

    res.status(204).json({ data: updatedTask });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};











*/



/* 

пишу сервер на express js использую typescript помоги создать правильную модель  Task в prisma . и так я хочу что бы таски у которых parentId != null имели status (Undone/Done) и по умолчанию было undone. 
а все Task у которых parentId == null  имели columnStatus (Queue/Development/Done) еще я попытался создать enum но я сделал кажется неправильно исправь мой код :

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:GN74JZEL22UucfG1p1x3@containers-us-west-174.railway.app:6548/railway"
}

model Board {
  id        Int      @id @default(autoincrement())
  name      String
  columns   Column[]
  createdAt DateTime @default(now())
}

enum Columns {
  QUEUE
  DEVELOPMENT
  DONE
}

model Column {
  id        Int      @id @default(autoincrement())
  name      String
  boardId   Int
  board     Board    @relation(fields: [boardId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  task      Task[]
}

enum Status {
  QUEUE
  DEVELOPMENT
  DONE
}

model Task {
  id          Int       @id @default(autoincrement())
  name        String
  description String?
  priority    Priority  @default(LOW)
  columnId    Int?
  column      Column?   @relation(fields: [columnId], references: [id], onDelete: Cascade)
  files       File[]
  comments    Comment[]
  createdAt   DateTime  @default(now())

  status Status @default(QUEUE)

  position Int @default(autoincrement()) // Position in column

  subTasks Task[] @relation("TaskSubtask")
  parent   Task?  @relation("TaskSubtask", fields: [parentId], references: [id], onDelete: Cascade)
  parentId Int?
}

enum Priority {
  LOW
  HIGH
}

//Temp
model File {
  id        Int      @id @default(autoincrement())
  name      String
  taskId    Int
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade, onUpdate: NoAction)
  createdAt DateTime @default(now())
}

model Comment {
  id      Int    @id @default(autoincrement())
  content String
  taskId  Int
  task    Task   @relation(fields: [taskId], references: [id], onDelete: Cascade)

  comments Comment[] @relation("CommentComment")
  comment  Comment?  @relation("CommentComment", fields: [parentId], references: [id], onDelete: Cascade, onUpdate: NoAction)
  parentId Int?

  createdAt DateTime @default(now())
}


этот код работает но я хочу что бы  ты добавил  когда task  с parentId==null перемещается в Column name которого равен Done  то пусть все таски с parentId равного id таска который мы перемещаем изменят свой status на Done





я хочу что бы ты исправил этот код что бы он


я хочу что бы когда мы двигали таск id которого мы прописали в body мы изменяли его status на Column name  того столбца куда его перенесли
 вот модель в schema.prisma 

model Column {
  id        Int      @id @default(autoincrement())
  name      String
  boardId   Int
  board     Board    @relation(fields: [boardId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  task      Task[]
}

model Task {
  id          Int       @id @default(autoincrement())
  name        String
  description String?
  priority    Priority  @default(LOW)
  columnId    Int?
  column      Column?   @relation(fields: [columnId], references: [id], onDelete: Cascade)
  files       File[]
  comments    Comment[]
  createdAt   DateTime  @default(now())

  status      String

  position Int @default(autoincrement()) // Position in column

  subTasks Task[] @relation("TaskSubtask")
  parent   Task?  @relation("TaskSubtask", fields: [parentId], references: [id], onDelete: Cascade)
  parentId Int?
}

 вот функция

import { Request, Response } from 'express';
import { prisma } from '../db';
import { Prisma } from '@prisma/client';

enum Columns {
  QUEUE = 'Queue',
  DEVELOPMENT = 'Development',
  DONE = 'Done',
}

enum Status {
  QUEUE = 'Queue',
  DEVELOPMENT = 'Development',
  DONE = 'Done',
  UNDONE = 'Undone'
}



type ReorderedItems = {
  id: number;
  position: number;
};

type MoveColumn = {
  oldColumnId: number;
  newColumnId: number;
  tasks: ReorderedItems[];
};

async function reorder(tasks: ReorderedItems[], columnId: number) {
  const updates = tasks.map((task) =>
    prisma.task.update({
      where: { id: task.id },
      data: {
        position: task.position,
        columnId: columnId,
      },
    })
  );

  await Promise.all(updates);
}

async function reorderOldColumn(oldColumnId: number) {
  const column = await prisma.column.findUnique({
    where: { id: oldColumnId },
    include: {
      task: {
        orderBy: {
          position: 'asc',
        },
      },
    },
  });

  if (!column) return;

  for (let i = 0; i < column.task.length; i++) {
    const taskId = column.task[i].id;

    await prisma.task.update({
      where: { id: taskId },
      data: { position: i + 1 },
    });
  }
}

async function updateStatusOfSubtasks(taskId: number, newStatus: Status) {
  const subtasks = await prisma.task.findMany({
    where: {
      parentId: taskId,
    },
  });

  const updateSubtasks = subtasks.map((subtask) =>
    prisma.task.update({
      where: { id: subtask.id },
      data: {
        status: newStatus,
      },
    })
  );

  await Promise.all(updateSubtasks);
}

export const moveColumn = async (req: Request, res: Response) => {
  const { oldColumnId, newColumnId, tasks } = (req.body as MoveColumn) ?? {};

  if (!newColumnId || !oldColumnId) {
    return res.status(400).json({ message: 'Please provide all columns ids' });
  }

  if (newColumnId === oldColumnId) {
    await reorder(tasks, newColumnId);
  } else {
    await reorder(tasks, newColumnId);
    await reorderOldColumn(oldColumnId);
  }

  // Check if the new column is 'Done' and update subtasks' status if necessary
  const newColumn = await prisma.column.findUnique({
    where: { id: newColumnId },
  });

  if (newColumn && newColumn.name === Columns.DONE) {
    for (const task of tasks) {
      const taskId = task.id;
      await updateStatusOfSubtasks(taskId, Status.DONE);
    }
  }

  res.status(200).json({ message: 'Update position of all tasks' });

  try {
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};



















*/