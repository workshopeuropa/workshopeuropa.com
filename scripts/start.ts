const environmentAliases = {
	HOST: 'HTTP_HOST',
	PORT: 'HTTP_PORT',
	SOCKET_PATH: 'HTTP_SOCKET',
	ORIGIN: 'HTTP_OVERRIDE_ORIGIN',
	HOST_HEADER: 'HTTP_HOST_HEADER',
	PROTOCOL_HEADER: 'HTTP_PROTOCOL_HEADER',
	ADDRESS_HEADER: 'HTTP_IP_HEADER',
	XFF_DEPTH: 'HTTP_XFF_DEPTH',
	BODY_SIZE_LIMIT: 'HTTP_MAX_BODY'
}

for (const [previous, current] of Object.entries(environmentAliases)) {
	const value = Bun.env[previous]
	if (value !== undefined) Bun.env[current] ??= value
}

Bun.env.HTTP_MAX_BODY ??= '512KiB'

await import(new URL('../build/index.js', import.meta.url).href)
