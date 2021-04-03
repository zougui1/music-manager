import '../setup';
import { createConnection } from 'database-pkg';
import { User } from 'user-pkg';

const clearUsers = async (): Promise<void> => {
  const user = new User();

  await user.clear();
}

const populateUsers = async (): Promise<void> => {
  const user = new User();

  await Promise.all([
    user.signup({
      email: 'zougui@gmail.com',
      name: 'Zougui',
      password: 'nopassword',
    }),
    user.signup({
      email: 'duh@duh.duh',
      name: 'Duh',
      password: 'John Duh',
    }),
  ]);
}

export async function main(args: any): Promise<void> {
  const connection = await createConnection();

  try {
    await clearUsers();
    await populateUsers();
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}
