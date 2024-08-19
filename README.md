# Proyecto Webex Bot usando `webex-node-bot-framework` and `client-bedrock-agent-runtime`

## Descripción

Este proyecto es un bot para Webex creado utilizando el framework [`webex-node-bot-framework`](https://github.com/WebexSamples/webex-node-bot-framework). El bot puede interactuar con los usuarios en Webex y resolver preguntas relacionadas con políticas internas, uber empresarial, agencias de viajes, alta de presupuestos, comprobación de gastos, retiro de efectivo en cajeros, revisión de comprobantes, entre otros temas relevantes.

## Requisitos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [Docker](https://www.docker.com/get-started) (opcional)
- Una cuenta en [Webex](https://www.webex.com/)
- Una aplicación (bot) de Webex registrada en el [Portal Webex Developer](https://developer.webex.com/)

## Instalación y despliegue
### Opción 1: Despliegue sin Docker (entorno local)
1. **Clonar el repositorio:**

   ```
    git clone https://github.com/rafacr-IK/webex-testBot.git
    cd webex-testBot
    ```
    
2.	**Instalar las dependencias:**
Asegúrate de que tienes la versión más reciente del framework webex-node-bot-framework y las demás dependencias necesarias:
    ```
    npm install
    npm audit fix
    npm update
    ```

3.	**Configuración de variables de entorno:**
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:
    ```
    WEBEX_BOT_TOKEN=

    AWS_REGION=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=

    AWS_AGENT_ALIAS_ID=
    AWS_AGENT_ID=
    ```
    - ACCESS_TOKEN: El token de acceso de tu bot de Webex.
    - REGION: La region de AWS donde consumirás el servicio de Bedrock.
    - AWS_ACCESS_KEY_ID=
    - AWS_SECRET_ACCESS_KEY=
    - AWS_AGENT_ALIAS_ID=
    - AWS_AGENT_ID=

4.	**Inicial el bot:**
Para iniciar el bot ejecuta:

    ```
    npm start
    ```
    Si el proceso de despliegue fue exitoso, deberías de ver el siguiente mensaje en los logs:
    ```
    Listening for webex teams events...
    ```
### Opción 2: Despliegue usando Docker
1. **Clonar el repositorio:**

   ```
    git clone https://github.com/rafacr-IK/webex-testBot.git
    cd webex-testBot
    ```
    
2.	**Configuración de variables de entorno:**
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:
    ```
    WEBEX_BOT_TOKEN=

    AWS_REGION=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=

    AWS_AGENT_ALIAS_ID=
    AWS_AGENT_ID=
    ```
    - ACCESS_TOKEN: El token de acceso de tu bot de Webex.
    - REGION: La region de AWS donde consumirás el servicio de Bedrock.
    - AWS_ACCESS_KEY_ID=
    - AWS_SECRET_ACCESS_KEY=
    - AWS_AGENT_ALIAS_ID=
    - AWS_AGENT_ID=
    
3.	**Constrir la imagen de docker:**
    ```
    docker build -t <CONTAINER_NAME>:<TAG> .
    ```
4.	**Ejecuta el contenedor y valida los logs:**
Ejecuta el contenedor de Docker utilizando la imagen creada anteriormente con el comando:
    ```
    docker run --name $<CONTAINER_NAME>\
    --env BUCKET_NAME=$<BUCKET_NAME> \
    --env WEBEX_BOT_TOKEN= <WEBEX_BOT_TOKEN> \
    --env AWS_REGION= <AWS_REGION> \
    --env AWS_ACCESS_KEY_ID= <AWS_ACCESS_KEY_ID> \
    --env AWS_SECRET_ACCESS_KEY= <WS_SECRET_ACCESS_KEY> \
    --env AWS_AGENT_ALIAS_ID= <AWS_AGENT_ALIAS_ID> \
    --env AWS_AGENT_ID= <AWS_AGENT_ID> \
    --restart=always -d <CONTAINER_NAME>:$<TAG> 
    ```
    Para revisar los logs y validar el despliegue exitoso del bot ejecuta el siguiente comando:
    ```
    docker logs <CONTAINER_NAME> -f
    ```
    Si el proceso fue exitoso, deberías ver el siguiente mensaje:
    ```
    Listening for webex teams events...
    ```

## Recursos adicionales

- [Documentación oficial del framework `webex-node-bot-framework`](https://github.com/WebexSamples/webex-node-bot-framework)
- [Portal de desarrolladores de Webex](https://developer.webex.com/)
- [AWS Bedrock Overview](https://aws.amazon.com/bedrock/)