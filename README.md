Workflow
Branch
Product
Provider
Sub-Agent
Super-Agent
Counseller
Owner
Intake  
Stage
Note

```prisma
model Application {
id Int @id @default(autoincrement())
applicationId String @default("")
provider Provider @relation(fields: [providerId], references: [id])
providerId Int
product Product @relation(fields: [productId], references: [id])
productId Int
intake String
workflow Workflow @relation(fields: [workflowId], references: [id])
workflowId Int
client Client @relation(fields: [clientId], references: [id])
clientId Int
superAgent Agent? @relation("ApplicationSuperAgent", fields: [superagentId], references: [id])
superagentId Int?
subAgent Agent? @relation("ApplicationSubAgent", fields: [subagentId], references: [id])
subagentId Int?
owner User @relation("OwnerApplication", fields: [ownerId], references: [id])
ownerId Int
owners ApplicationOwners[]
counsellor User @relation("CounsellorApplication", fields: [counsellorId], references: [id])
counsellorId Int

branch Branch? @relation(fields: [branchId], references: [id])
branchId Int? @default(1)

applicationStatus Process? @relation(fields: [applicationStatusId], references: [id])
applicationStatusId Int?

Note Note? @relation(fields:[noteId], references:[id])
noteId Int?

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@map("applications")
}
```
