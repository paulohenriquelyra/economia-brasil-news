'''
# Economia Brasil News - Site Estático com CI/CD

Este projeto demonstra um pipeline completo de CI/CD para um site HTML estático, aplicando as lições aprendidas de um projeto anterior mais complexo. O site exibe as principais notícias da economia brasileira e é atualizado automaticamente a cada push para a branch `main`.

## 🚀 Funcionalidades

- **Site Estático Moderno**: Um site HTML, CSS e JavaScript, leve e responsivo.
- **Conteúdo Dinâmico**: Exibe as 5 principais notícias da economia brasileira.
- **Dockerfile Otimizado**: Usa Nginx para servir o conteúdo estático, resultando em uma imagem Docker leve e performática.
- **Pipeline CI/CD Completo**: Automação de build, push e deploy com GitHub Actions.
- **Deploy em Kubernetes**: Configurado para deploy em qualquer cluster Kubernetes (testado com RKE2).
- **Self-Hosted Runner**: Utiliza um runner auto-hospedado para garantir a comunicação segura com o cluster local.

## 🛠️ Estrutura do Projeto

```
/economia-brasil-news
├── .github/workflows/
│   └── cicd.yaml       # Workflow de CI/CD
├── k8s/
│   ├── deployment.yaml # Manifesto de Deployment
│   └── service.yaml    # Manifesto de Service
├── Dockerfile          # Dockerfile para build da imagem com Nginx
├── index.html          # Arquivo principal do site
├── styles.css          # Folha de estilos
└── script.js           # JavaScript para interatividade
```

## ⚙️ Configuração e Deploy

O pipeline está quase todo automatizado. Siga estes passos para finalizar a configuração:

### 1. Faça o Upload do Código

Como o GitHub bloqueia a criação de workflows por aplicações, você precisa fazer o upload manual dos arquivos deste projeto para o repositório [economia-brasil-news](https://github.com/paulohenriquelyra/economia-brasil-news) que foi criado.

### 2. Configure os Secrets no GitHub

Para que o pipeline funcione, você precisa configurar os seguintes secrets no seu repositório:

1.  **Acesse**: `Settings` → `Secrets and variables` → `Actions`
2.  **Clique em**: `New repository secret`
3.  **Adicione os seguintes secrets**:

| Secret                | Descrição                                                                 | Exemplo de Valor                                  |
| --------------------- | ------------------------------------------------------------------------- | ------------------------------------------------- |
| `DOCKER_HUB_USERNAME` | Seu nome de usuário do Docker Hub.                                        | `seu_usuario`                                     |
| `DOCKER_HUB_TOKEN`    | Um token de acesso do Docker Hub com permissões de leitura e escrita.     | `dckr_pat_...`                                    |
| `KUBECONFIG`          | O conteúdo do seu arquivo `~/.kube/config`, codificado em **Base64**. | `apiVersion: v1\nclusters:\n- cluster:\n...` (codificado) |

**Para gerar o `KUBECONFIG` em Base64, use o comando:**
```bash
cat ~/.kube/config | base64
```

### 3. Verifique o Self-Hosted Runner

Certifique-se de que seu self-hosted runner está **online** e pronto para receber jobs. Você pode verificar o status em:

- `Settings` → `Actions` → `Runners`

## 🚀 Como Funciona o Pipeline

O workflow definido em `.github/workflows/cicd.yaml` é acionado a cada `push` na branch `main` e executa dois jobs principais:

1.  **`build-and-push`**:
    - Roda em um runner do GitHub (`ubuntu-latest`).
    - Faz login no Docker Hub usando os secrets.
    - Constrói a imagem Docker do site com Nginx.
    - Envia a imagem para o seu Docker Hub com uma tag única (o hash do commit).

2.  **`deploy`**:
    - Roda no seu **self-hosted runner** (`self-hosted`).
    - Configura o `kubectl` usando o secret `KUBECONFIG`.
    - Atualiza o arquivo `deployment.yaml` com o nome da nova imagem Docker.
    - Aplica os manifestos (`deployment.yaml` e `service.yaml`) no seu cluster Kubernetes.

## 🌐 Acessando a Aplicação

Após o deploy, a aplicação estará acessível no seu cluster através da NodePort configurada:

- **URL**: `http://<IP_DO_SEU_CLUSTER>:30082`

---
---\---
*Este projeto foi desenvolvido como um exercício prático para demonstrar um fluxo de CI/CD moderno e eficiente, aplicando as melhores práticas e lições aprendidas.*
'''
