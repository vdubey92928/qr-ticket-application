# Use official Java image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Build the app
RUN chmod +x mvnw && ./mvnw clean install -DskipTests

# Run the app
CMD ["java", "-jar", "target/*.jar"]