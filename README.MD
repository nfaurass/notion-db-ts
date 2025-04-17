# notion-db-ts

### A lightweight TypeScript ORM designed for Notion.

It empowers developers to integrate Notion as a dynamic database, using the power of TypeScript to achieve robust,
type-safe interactions.

You can define Notion database schemas, perform CRUD operations, and build queries effortlessly—all designed to boost
your productivity and keep your code error-free.

## Installation

```bash
npm install notion-db-ts
```

## Usage Examples

Want to see how it all works in practice?
Check out the ```/examples``` folder for real-world usage examples and practical guides.

Whether you're just getting started or diving into advanced features, there's something there to help you build faster.

## Limitations

While **notion-db-ts** streamlines your workflow with Notion, there are a few important considerations:

- **Rate Limits:** Notion’s API has rate limits, so be mindful of how many requests your application sends.
- **Complex Queries:** Notion is not a traditional relational database. Basic queries are simple, but complex relational
  queries might be limited.
- **API Latency:** Performance depends on Notion’s API response times, which may not match those of conventional
  databases.

## Contributing

Your contributions make **notion-db-ts** even better!

If you have ideas, bug reports, or pull requests, please open an issue or submit a PR. Every contribution is welcome and
appreciated.

## License

This project is **MIT Licensed**.

## Roadmap

We’re always looking to make **notion‑db‑ts** more powerful and more reliable.  
If you’d like to help, pick any task below, file an issue or submit a PR, and add the appropriate issue label (
e.g. `help wanted`, `good first issue`).

### Currently in Development

- [ ] Full support for advanced filtering options (e.g. sortBy, orderBy, limit, offset, etc.)
- [ ] Automatic exponential backoff and retry when hitting Notion API rate limits
- [ ] Support for complex data relationships and table-to-table mapping
- [ ] More improvements coming soon...

<br>
<br>

-----

Made with ❤️ for Notion users!