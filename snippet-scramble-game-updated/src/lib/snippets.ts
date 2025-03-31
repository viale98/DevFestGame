export const snippets = [
  {
    id: 'snippet1',
    title: 'VolatileTest.java',
    code: `class SharedResource {
    private volatile boolean flag = false;

    public void setFlagTrue() {
        flag = true;
    }

    public boolean isFlagSet() {
        return flag;
    }
}

public class VolatileTest {
    public static void main(String[] args) throws InterruptedException {
        SharedResource resource = new SharedResource();

        Thread writer = new Thread(resource::setFlagTrue);
        Thread reader = new Thread(() -> {
            while (!resource.isFlagSet()) {
                // Busy-waiting loop
            }
            System.out.println("Flag set to true!");
        });

        writer.start();
        reader.start();

        writer.join();
        reader.join();
    }
}`,
    isCorrect: true
  },
  {
    id: 'snippet2',
    title: 'ReflectionHack.java',
    code: `import java.lang.reflect.Field;

class Secret {
    private String password = "superSecret123";
}

public class ReflectionHack {
    public static void main(String[] args) throws Exception {
        Secret secret = new Secret();
        Field field = Secret.class.getDeclaredField("password");
        field.setAccessible(true);
        String hackedPassword = (String) field.get(secret);
        System.out.println("Hacked password: " + hackedPassword);
    }
}`,
    isCorrect: true
  },
  {
    id: 'snippet3',
    title: 'AutoboxingTest.java',
    code: `public class AutoboxingTest {
    public static void main(String[] args) {
        Integer value = null;
        int result = value + 10;
        System.out.println("Result: " + result);
    }
}`,
    isCorrect: false
  }
];