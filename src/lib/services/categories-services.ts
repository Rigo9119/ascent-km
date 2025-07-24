import { supabaseClient } from "../supabase";

export class CategoriesService {
  static async getAllCategories() {
    try {
      const { data: categories, error: sbError } = await supabaseClient.from('categories').select('*');
      if (sbError) throw new Error(`getAllCategories error: ${sbError.message}`);
      return categories;
    } catch (error) {
      throw new Error(`getAllCategories-services-error: ${error}`);
    }
  }
}
