#!/bin/bash

# Define the Docker Compose project name
PROJECT_NAME="easy-invoice_dev"

# Check if Docker Compose is already running for the project
running_containers=$(docker compose -p $PROJECT_NAME ps -q)

if [ -z "$running_containers" ]; then
    echo "Building Docker containers..."
    # Rebuild Docker containers to ensure any changes are applied
    docker compose -f ./dev/docker-compose.yml -p $PROJECT_NAME build
    
    echo "Starting services with Docker Compose..."
    # Start services defined in docker-compose.yml
    docker compose -f ./dev/docker-compose.yml -p $PROJECT_NAME up -d
else
    echo "Docker Compose is already running for $PROJECT_NAME."
fi


echo "Starting web app..."
next dev
