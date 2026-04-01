FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# Build the jar
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Debug: list files (IMPORTANT)
RUN ls -l target

# Run exact jar
CMD ["sh", "-c", "java -jar $(ls target/*.jar)"]