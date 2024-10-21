import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/session";
import SaveForm from "./save-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteButton from "./delete-button";
import DoneButton from "./done-button";

export default async function Home() {
  const user = await getAuthUser();

  if (!user) return;

  const tasks = await db.query.tasks.findMany({
    where: (t, { eq }) => eq(t.userId, user.id),
  });

  return (
    <div className="grid place-items-center h-screen container mx-auto py-16">
      <div className="w-full max-w-2xl space-y-12">
        <Card>
          <CardHeader>
            <CardTitle>Crear tarea</CardTitle>
            <CardDescription>
              Crea una nueva tarea para completar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SaveForm />
          </CardContent>
        </Card>
        <div className="pb-16">
          <h1 className="text-2xl font-bold">Tareas</h1>
          <Table>
            <TableCaption>Tus tareas.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Completada</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No hay tareas.
                  </TableCell>
                </TableRow>
              )}
              {tasks.map((task) => (
                <TableRow key={task.name}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    <DoneButton id={task.id} isDone={task.isDone} />
                  </TableCell>
                  <TableCell>
                    <DeleteButton id={task.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
