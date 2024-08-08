# Full Information of project

## Libraries that I have installed

- Next for app
- Postgresql for db
- prisma for ORM
- shadCn-ui
- next-auth for auth
- react-beautiful-dnd for drag and drop

## Now setting up Prisma

- we can use docker for postgres instance in our machine or we can use db provider neondb or avien
- In dev using docker

  **Docker commands for postgres and setup postgresql**

  - for new docker instance or container -
    - docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
  - To go inside the db container
    - docker exec -it "PSQL-Container-ID" bash
  - CLI for postgres using psql
    - psql -h localhost -p 5432 -U postgres -W
    - list dbs- "\dt"
  - DB_URL:
    - DATABASE_URL="postgresql://POSTGRES_USER:POSTGRES_PASSWORD@POSTGRES_HOST/POSTGRES_DB"

- Now define schema for user and tasks
- npx prisma migrate dev
- npx prisma generate

- add into package.json :
  - "prisma":
    {
    "seed": "ts-node prisma/seed.ts"
    }
  - create seed.ts file in prisma folder
  - add seed data into seed.ts file
- run npx prisma db seed

## Authentication

- we use next-auth for this app
- npm i next-auth
- so the routes are as follows:
  - /api/auth for handling signin and signout using next-auth
  - /api/register for signup
- then write the file for auth-config for credentialProviders

  - here we are using nextauth with custom configuration
  - in auth-config : providers[credentialsProvider[name, adapter, credentials, authorize], callbacks{jwt, session}, session:{strategy: 'jwt'}, pages: to redirect the signin signup request, secret: Nextauthsecret]

- then the session state is available throughout your application we have to ensure SessionProvider covers all the children.

- at last in components check for session await getServerSession(authOptions)
- In buttons use router.push() and in link href use redirect()
- create a folder types and file next-auth.d.ts and insert the code:
  ```
    import NextAuth from "next-auth"
    declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
      }
    }
  ```

## User Routes

- don't need user id as such

## Task Routes

- /api/tasks/route.ts - POST and GET
- /api/tasks/[id]/route.ts - PUT and DELETE

# NOW start FRONT-END part
  so first challenge in frontend is :-
    - sidebar using shadcn in nextjs
        - we are using sheet from shadcn here
        - and using usehooks-ts library for bre built custom hooks
     - so we will be building three components for sidebar
       -sidebar-button
       -sidebar-desktop
       -sidebar-mobile
       -sidebar (main component)

       