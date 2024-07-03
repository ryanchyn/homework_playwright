# Use the official Node.js image.
FROM mcr.microsoft.com/playwright:focal

# Copy the local files to the container folder
COPY . /homework_playwright

# set up executed folder in container
WORKDIR /homework_playwright

# Install dependencies
RUN npm i

# Install Playwright dependencies
#RUN npx playwright install-deps

# Install the browsers needed for Playwright
#RUN npx playwright install

# Run tests (This can be modified as needed)
CMD ["npx", "playwright", "test", "testAPiCrud.spec.ts"]