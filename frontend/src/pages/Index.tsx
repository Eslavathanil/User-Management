import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserForm from "@/components/UserForm";
import UserTable from "@/components/UserTable";
import SearchBar from "@/components/SearchBar";
import { userApi, type User, type GetUsersPayload } from "@/api/userApi";
import { useToast } from "@/hooks/use-toast";
import { Plus, Users, Loader2, RefreshCw } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentFilters, setCurrentFilters] = useState<GetUsersPayload>({});

  const fetchUsers = async (filters?: GetUsersPayload) => {
    setLoading(true);
    try {
      const response = await userApi.getUsers(filters);
      setUsers(response.users || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch users",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (filters: GetUsersPayload) => {
    setCurrentFilters(filters);
    fetchUsers(filters);
  };

  const handleCreateSuccess = () => {
    setCreateDialogOpen(false);
    fetchUsers(currentFilters);
  };

  const handleEditSuccess = () => {
    setEditingUser(null);
    fetchUsers(currentFilters);
  };

  const handleDelete = async (user: User) => {
    try {
      await userApi.deleteUser({ user_id: user.user_id });
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      fetchUsers(currentFilters);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to delete user",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">User Management System</h1>
                <p className="text-primary-foreground/80 mt-1">
                  Complete CRUD operations for user data
                </p>
              </div>
            </div>
            <Button
              onClick={() => setCreateDialogOpen(true)}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create User
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Search Section */}
        <SearchBar onSearch={handleSearch} />

        {/* Stats Card */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold text-primary">{users.length}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => fetchUsers(currentFilters)}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
        </div>

        {/* Table Section */}
        {loading && users.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground">Loading users...</p>
            </div>
          </div>
        ) : (
          <UserTable
            users={users}
            onEdit={setEditingUser}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Create User Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new user. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <UserForm
            onSuccess={handleCreateSuccess}
            onCancel={() => setCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update the user details. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <UserForm
            editingUser={editingUser}
            onSuccess={handleEditSuccess}
            onCancel={() => setEditingUser(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
