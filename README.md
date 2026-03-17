
<!-- jumbotron with links -->
<div align="center">
  <h1 align="center">Lavalink list</h1>
  <p align="center">
    A list of free and available public Lavalink nodes with their live status. Feel free to make a pull request!
    <br />
    <br />
    <a href="https://lavalink-list.stackryze.com">View Website</a>
    .
    <a href="https://github.com/stackryze/lavalink-list/pulls">Make a pull request</a>
    ·
    <a href="https://github.com/stackryze/lavalink-list/issues">Report Issue</a>
  </p>
</div>

<p align="center">
  <a href="https://github.com/stackryze/lavalink-list/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/stackryze/lavalink-list.svg?style=for-the-badge" />
  </a>
  <a href="https://github.com/stackryze/lavalink-list/issues">
    <img src="https://img.shields.io/github/issues/stackryze/lavalink-list.svg?style=for-the-badge" />
  </a>
  <a href="https://github.com/stackryze/lavalink-list/network/members">
    <img src="https://img.shields.io/github/forks/stackryze/lavalink-list.svg?style=for-the-badge" />
  </a>
  <a href="https://github.com/stackryze/lavalink-list/stargazers">
    <img src="https://img.shields.io/github/stars/stackryze/lavalink-list.svg?style=for-the-badge" />
  </a>
</p>



<!-- how to add my node -->
## How to add my node?

### Option 1: Using the Dashboard (Recommended)

1. Visit [lavalink-list.stackryze.com](https://lavalink-list.stackryze.com)
2. Click the **"Sign In"** button in the navbar
3. Sign in with your Discord account via OAuth
4. Go to the **Dashboard** page
5. Click **"Add New Node"** button
6. Fill in your node details:
   - **Identifier**: A unique name for your node (e.g., "my-node")
   - **Host**: Your node's hostname or IP address (e.g., "lava1.example.com")
   - **Port**: The port your node is running on (default: 2333)
   - **Password**: Your node's password
   - **Secure (SSL)**: Toggle if your node uses SSL/TLS
   - **REST Version**: Select your Lavalink API version (v3 or v4)
   - **Website**: Your website URL (optional)
   - **Discord**: Your Discord server invite link (optional)
7. Click **"Add Node"** to submit

**Benefits:**
- Instant node publishing without pull requests
- Easy management of your nodes in the dashboard
- Edit or delete your nodes anytime
- Only you can manage your own nodes

### Option 2: Pull Request (GitHub)

1. Fork this repository
2. Edit the `nodes.json` file and add your node
3. Create a pull request with your changes

<!-- nodes.json example -->
## `nodes.json` example

```json
[
    {
        "identifier": "my-node",
        "host": "lava1.example.com",
        "port": 2333,
        "password": "example.com",
        "secure": false,
        "restVersion": "v4",
        "authorId": "1234567890",
        "website": "https://example.com",
        "discord": "https://discord.gg/example"
    }
]
```

- `identifier` - The identifier of your node (example: my-node)
- `host` - The host of your node (example: lava1.example.com)
- `port` - The port of your node (default: 2333)
- `password` - The password of your node (if you have one)
- `secure` - If your node is using SSL (true or false)
- `restVersion` - The version of your node (lavalink rest api version) (v3 or v4)
- `authorId` - Your Username
- `website` - Your website URL (optional)
- `discord` - Your Discord server invite link (optional)

## Contributers

Thanks to our amazing contributors :

<a href="https://github.com/stackryze/lavalink-list/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=stackryze/lavalink-list" />
</a>
