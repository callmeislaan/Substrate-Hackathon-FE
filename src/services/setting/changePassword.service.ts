/* eslint-disable @typescript-eslint/no-explicit-any */
import { anestAxios } from "@/libs/axios";
import { ChangePassword } from "@/types/auth/changePassword";

const updateApi = "api/user/update-password";
class ChangePasswordService {
  updatePassword(changePassword: ChangePassword) {
    return anestAxios.put<any>(`${updateApi}`, changePassword);
  }
}

// Export a singleton instance in the global namespace
export const changePasswordService = new ChangePasswordService();
