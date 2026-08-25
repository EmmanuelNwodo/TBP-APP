import { clear } from "console";
import { NextResponse } from "next/server";

export async function GET() {
  const wordpressApiUrl = process.env.WORDPRESS_API_URL;

  if (!wordpressApiUrl) {
    return NextResponse.json(
      {
        success: false,
        error: "WORDPRESS_API_URL is not defined",
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${wordpressApiUrl}/posts?per_page=1&status=publish`
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `WordPress API returned ${response.status}`,
        },
        { status: response.status }
      );
    }

    const posts = await response.json();

    return NextResponse.json({
      success: true,
      message: "WordPress API connection is working",
      postsFound: posts.length,
      firstPost: posts[0]
        ? {
            id: posts[0].id,
            slug: posts[0].slug,
            title: posts[0].title?.rendered,
          }
        : null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}