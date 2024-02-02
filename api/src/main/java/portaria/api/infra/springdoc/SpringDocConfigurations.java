package portaria.api.infra.springdoc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SpringDocConfigurations {
	
	@Bean
	OpenAPI customOpenAPI() {
	    return new OpenAPI()
	            .components(new Components()
	                    .addSecuritySchemes("bearer-key",
	                            new SecurityScheme()
	                                    .type(SecurityScheme.Type.HTTP)
	                                    .scheme("bearer")
	                                    .bearerFormat("JWT")))
	                    .info(new Info()
	                            .title("Portaria API")
	                            .description("API Rest da aplicação da Portaria, contendo as funcionalidades de CRUD de visitantes, veiculos e motoristas, além de laçamentos de carga e descarga de mercadoria e cancelamento desses lançamentos.")
	                            .contact(new Contact()
	                                    .name("Time De Desenvolvimento")
	                                    .email("ti@isoeste.com.br"))
	                    .license(new License()
	                            .name("Apache 2.0")
	                            .url("http://portaria/api/licenca"))
	                    .version("1.0.1"));
	}
}
