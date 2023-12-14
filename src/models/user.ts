export type User = {
  id: number;
  firstName: string;
  lastName: string;
  nikName: string;
  role: Role;
  avatar: string;
  email: string;
  createdAt: string;
};

enum Role {
  USER = "User",
  WRITER = "Writer",
  ADMIN = "Admin",
}
