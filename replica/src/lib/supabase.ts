// This file has been updated to fetch college info from the local MongoDB backend instead of Supabase.
// We preserve the name and export signature to avoid breaking imports elsewhere in the frontend.

interface CollegeInfoRow {
  category: string;
  title: string;
  content: string;
}

export async function fetchCollegeContext(): Promise<string> {
  try {
    const response = await fetch("http://localhost:5000/api/college-info");
    if (!response.ok) {
      throw new Error(`Failed to fetch college info: ${response.statusText}`);
    }
    
    const result = await response.json();
    const data: CollegeInfoRow[] = result.data;
    
    if (!data || data.length === 0) return "";

    const grouped = data.reduce((acc, row) => {
      if (!acc[row.category]) acc[row.category] = [];
      acc[row.category].push(`${row.title}: ${row.content}`);
      return acc;
    }, {} as Record<string, string[]>);

    return Object.entries(grouped)
      .map(([cat, items]) => `=== ${cat.toUpperCase()} ===\n${items.join('\n')}`)
      .join('\n\n');
  } catch (error) {
    console.error("Error loading college info from MongoDB:", error);
    return "";
  }
}

// Dummy export to prevent compilation errors if referenced elsewhere
export const supabase = {
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null })
    })
  })
};