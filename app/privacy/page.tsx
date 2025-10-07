import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-card py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center">PRIVACY POLICY</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">WHO WE ARE</h2>
              <p className="text-muted-foreground">
                Suggested text: Our website address is:
                <a href="https://upskillworkforce.co" className="text-primary hover:underline ml-1">
                  https://upskillworkforce.co
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">COMMENTS</h2>
              <p className="text-muted-foreground">
                Suggested text: When visitors leave comments on the site we collect the data shown in the comments form,
                and also the visitor's IP address and browser user agent string to help spam detection.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">MEDIA</h2>
              <p className="text-muted-foreground">
                Suggested text: If you upload images to the website, you should avoid uploading images with embedded
                location data (EXIF GPS) included. Visitors to the website can download and extract any location data
                from images on the website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">COOKIES</h2>
              <p className="text-muted-foreground mb-4">
                Suggested text: If you leave a comment on our site you may opt-in to saving your name, email address and
                website in cookies. These are for your convenience so that you do not have to fill in your details again
                when you leave another comment. These cookies will last for one year.
              </p>
              <p className="text-muted-foreground">
                If you visit our login page, we will set a temporary cookie to determine if your browser accepts
                cookies. This cookie contains no personal data and is discarded when you close your browser.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">EMBEDDED CONTENT FROM OTHER WEBSITES</h2>
              <p className="text-muted-foreground">
                Suggested text: Articles on this site may include embedded content (e.g. videos, images, articles,
                etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited
                the other website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">WHO WE SHARE YOUR DATA WITH</h2>
              <p className="text-muted-foreground">
                Suggested text: If you request a password reset, your IP address will be included in the reset email.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">HOW LONG WE RETAIN YOUR DATA</h2>
              <p className="text-muted-foreground">
                Suggested text: If you leave a comment, the comment and its metadata are retained indefinitely. This is
                so we can recognize and approve any follow-up comments automatically instead of holding them in a
                moderation queue.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">WHAT RIGHTS YOU HAVE OVER YOUR DATA</h2>
              <p className="text-muted-foreground">
                Suggested text: If you have an account on this site, or have left comments, you can request to receive
                an exported file of the personal data we hold about you, including any data you have provided to us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">WHERE YOUR DATA IS SENT</h2>
              <p className="text-muted-foreground">
                Suggested text: Visitor comments may be checked through an automated spam detection service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
