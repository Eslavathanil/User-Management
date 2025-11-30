import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { userApi, type CreateUserPayload, type User } from "@/api/userApi";
import { validateMobile, validatePAN, validateRequired } from "@/utils/validation";
import { Loader2 } from "lucide-react";

interface UserFormProps {
  editingUser?: User | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function UserForm({ editingUser, onSuccess, onCancel }: UserFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateUserPayload>({
    full_name: "",
    mob_num: "",
    pan_num: "",
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof CreateUserPayload, string>>>({});

  useEffect(() => {
    if (editingUser) {
      setFormData({
        full_name: editingUser.full_name,
        mob_num: editingUser.mob_num,
        pan_num: editingUser.pan_num,
      });
    }
  }, [editingUser]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreateUserPayload, string>> = {};

    if (!validateRequired(formData.full_name)) {
      newErrors.full_name = "Full name is required";
    }

    const mobileValidation = validateMobile(formData.mob_num);
    if (!mobileValidation.valid) {
      newErrors.mob_num = "Mobile number must be 10 digits";
    }

    const panValidation = validatePAN(formData.pan_num);
    if (!panValidation.valid) {
      newErrors.pan_num = "PAN must be in format: ABCDE1234F";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Clean the data before submission
      const mobileValidation = validateMobile(formData.mob_num);
      const panValidation = validatePAN(formData.pan_num);

      const cleanedData: CreateUserPayload = {
        ...formData,
        mob_num: mobileValidation.cleaned,
        pan_num: panValidation.cleaned,
      };

      if (editingUser) {
        // For updates, we need to include manager_id from the original user
        const updateData = {
          ...cleanedData,
          manager_id: editingUser.manager_id,
        };
        
        await userApi.updateUser({
          user_ids: [editingUser.user_id],
          update_data: updateData,
        });
        toast({
          title: "Success",
          description: "User updated successfully",
        });
      } else {
        await userApi.createUser(cleanedData);
        toast({
          title: "Success",
          description: "User created successfully",
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="full_name">Full Name *</Label>
        <Input
          id="full_name"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          placeholder="John Doe"
          className={errors.full_name ? "border-destructive" : ""}
        />
        {errors.full_name && (
          <p className="text-sm text-destructive">{errors.full_name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mob_num">Mobile Number *</Label>
        <Input
          id="mob_num"
          value={formData.mob_num}
          onChange={(e) => setFormData({ ...formData, mob_num: e.target.value })}
          placeholder="+911234567890 or 1234567890"
          className={errors.mob_num ? "border-destructive" : ""}
        />
        {errors.mob_num && (
          <p className="text-sm text-destructive">{errors.mob_num}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Enter 10 digits. Prefixes like +91 or 0 will be automatically removed.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pan_num">PAN Number *</Label>
        <Input
          id="pan_num"
          value={formData.pan_num}
          onChange={(e) => setFormData({ ...formData, pan_num: e.target.value.toUpperCase() })}
          placeholder="ABCDE1234F"
          className={errors.pan_num ? "border-destructive" : ""}
          maxLength={10}
        />
        {errors.pan_num && (
          <p className="text-sm text-destructive">{errors.pan_num}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {editingUser ? "Update User" : "Create User"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
