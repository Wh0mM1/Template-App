FROM openjdk:17

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} templateapp.jar

ENTRYPOINT ["java", "-jar", "/templateapp.jar"]

EXPOSE 8082